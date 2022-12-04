// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/** 
 * @dev Interface of the Sprinker Contract.
 */
interface ISprinker {

    /**
     * @dev Disperse function will distribute liquidity on different chains.
     */
    function disperse (
        uint32[] memory destinationDomain,
        uint256[] memory amount,
        address[] memory toToken,
        address[] memory recepient,
        address sourceAsset,
        uint256 relayerFee
    ) external payable;

    /**
     * @dev This funciton will be invoked by the connext contract to send the cross chain funds or data.
     */
    function xReceive(
        bytes32 _transferId,
        uint256 _amount,
        address _asset,
        address _originSender,
        uint32 _origin,
        bytes memory _callData
    ) external returns (bytes memory) ;
}
