//SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import {IConnext} from "@connext/nxtp-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IUniswapV2Router.sol";
import "./ISprinker.sol";

contract Sprinker is ISprinker {
    // The connext contract on the origin domain.
    IConnext public immutable connext;
    IUniswapV2Router public router;
    mapping (uint32 => address) public domainIdContracts;

    event SetDomainIdTargetEvent(
        address indexed target,
        uint32 domainID
    );

    event DisperseEvent(
        uint32[] destinationDomainIDs,
        uint256[] amounts,
        address[] toTokens,
        address[] recepients,
        address sourceAsset,
        uint256 relayerFee
    );

    event TokenReceivedEvent(
        address indexed receiver,
        address indexed tokenAddress,
        uint256 amount
    );

    constructor(IConnext _connext,address _router) {
        connext = _connext;
        router = IUniswapV2Router(_router);
    }

    /**
     * @dev This function will be used to set domainID target addresses
     */
    function setTarget(address _target, uint32 domainID) external {
        domainIdContracts[domainID] = _target;
        emit SetDomainIdTargetEvent(_target, domainID);
    }

    function disperse (
        uint32[] memory destinationDomainIDs,
        uint256[] memory amounts,
        address[] memory toTokens,
        address[] memory recepients,
        address sourceAsset,
        uint256 relayerFee
    ) external payable {
        uint256 totalAmount = check_total(amounts);
        IERC20(sourceAsset).transferFrom(msg.sender,address(this), totalAmount);
        IERC20(sourceAsset).approve(address(connext), totalAmount);
        uint256 i;
        for (i = 0; i < destinationDomainIDs.length; i++) {
            _disperse(sourceAsset, destinationDomainIDs[i],toTokens[i],amounts[i],recepients[i], relayerFee);
        }
        emit DisperseEvent(destinationDomainIDs, amounts, toTokens, recepients, sourceAsset, relayerFee);
    }

    function _disperse (
        address sourceAsset,
        uint32 destinationDomain,
        address  toToken,
        uint256 amount,
        address recepient,
        uint256 relayerFee
    ) internal {
        // Encode the data needed for the target contract call.
        bytes memory callData = abi.encode( toToken,recepient);
        require(domainIdContracts[destinationDomain] != address(0));
        connext.xcall{value: relayerFee}(
            destinationDomain, 
            domainIdContracts[destinationDomain],            
            sourceAsset,
            msg.sender,
            amount,
            0,
            callData
        );
    }

    function check_total(uint256[] memory _val) internal pure returns (uint256){
        uint i = 0;
        uint256 total;
        while (i < _val.length) {
            total = total + _val[i];
            i = i + 1;
        }
        return total;
    }

    // ------ Receive ---------
    /** @notice The receiver function as required by the IXReceiver interface.
    *   @dev The Connext bridge contract will call this function.
    */
    function xReceive(
        bytes32 _transferId,
        uint256 _amount,
        address _asset,
        address _originSender,
        uint32 _origin,
        bytes memory _callData
    ) external returns (bytes memory) {
   
        // Unpack the _callData
        (address _toToken, address _receiver)  = abi.decode(_callData, (address,address));
        if (_toToken != _asset) {
            // swapping the incoming asset with the toToken
            swapSingleHopExactAmountIn(_asset, _toToken, _amount, 0, _receiver);
        } else {
            IERC20 erc20  = IERC20(_asset);
            erc20.transfer(_receiver,_amount);
        }
        emit TokenReceivedEvent(_receiver, _toToken, _amount);
    }

    function swapSingleHopExactAmountIn(address _asset,address _toToken,uint amountIn, uint amountOutMin,address _receiver)
        internal
        returns (uint amountOut)
    {

        IERC20(_asset).approve(address(router), amountIn);

        address[] memory path;
        path = new address[](2);
        path[0] = _asset;
        path[1] = _toToken;

        uint[] memory amounts = router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            _receiver,
            block.timestamp
        );

        // amounts[0] = WETH amount, amounts[1] = DAI amount
        return amounts[1];
    }
}
