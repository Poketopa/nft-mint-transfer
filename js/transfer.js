import { web3, contractAddress, contract } from "./web3Setup.js";

const App = {
  metadataCID: "",

  //로그인 체크
  checkLogin: function (privatekey, publickey) {
    if (privatekey === null || publickey === null) {
      // 로그인 x -> alert(로그인 먼저) -> 로그인 페이지로 이동
      return false;
    } else {
      //로그인 o -> 다음 진행
      return true;
    }
  },

  clickTransfer: async function (
    fromPublickey,
    fromPrivatekey,
    toPublickey,
    tokenId
  ) {
    try {
      //이더 전송 완료 후 nft 민팅
      const signedTx = await web3.eth.accounts.signTransaction(
        {
          from: fromPublickey,
          to: contractAddress,
          gas: 2000000,
          gasPrice: web3.utils.toWei("20", "gwei"),
          data: contract.methods
            .nftTransfer(fromPublickey, toPublickey, tokenId)
            .encodeABI(),
        },
        fromPrivatekey
      );
      console.log("signedTx > ", signedTx);
      const transferReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log("전송 완료, receipt: ", transferReceipt);
      alert("전송 완료");
    } catch (error) {
      console.error("트랜잭션 에러: ", error);
    }
  },
};

//페이지 로딩되면
$(function () {
  //로그인 되었는지 확인
  let privatekey = localStorage.getItem("privateKey");
  let publickey = localStorage.getItem("walletAddress");
  // if (!App.checkLogin(privatekey, publickey)) {
  //   // 로그인 메시지 보여주기
  //   $('#userMessage').css('display', 'block'); // 메시지를 표시
  //   return; // 이후 동작은 멈춤
  // } else {
  //   $('#userMessage').css('display', 'none'); // 로그인 성공 시 메시지 숨기기
  // }
  document.getElementById("senderAddress").value = publickey;
  $("#transferBtn").on("click", function () {
    // 폼에서 값 가져오기

    const recipientAddress = document.getElementById("recipient").value;
    const nftId = document.getElementById("nftId").value;

    // 가져온 값 출력 (콘솔에)
    console.log("송신자 주소:", senderAddress);
    console.log("수신자 주소:", recipientAddress);
    console.log("NFT ID:", nftId);
    App.clickTransfer(publickey, privatekey, recipientAddress, nftId);
  });
});
