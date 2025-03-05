import { web3, contractAddress, contract } from "./web3Setup.js";
import { PINATA_TOKEN } from "./token.js";

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

  //file 업로드 -> 파일 업로드 -> /pinning/pinFileToIPFS로 요청 -> cid 반환
  fileUploadToPinata: async function (filename, uploadFile) {
    filename = filename.split(".", 2)[0];
    let serialnum = $("#serialnum").val();
    console.log(serialnum);
    const form = new FormData();
    form.append("file", uploadFile);
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${PINATA_TOKEN}` },
    };

    options.body = form;
    //ipfs에 파일(이미지) 업로드
    try {
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        options
      );
      const data = await response.json();
      let fileHash = data.IpfsHash;
      try {
        //메타데이터 업로드
        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PINATA_TOKEN}`,
            "Content-Type": "application/json",
          },

          // body: JSON.stringify(
          //   `{"pinataMetadata":{"name":"${filename}.json"},"pinataContent":{"name":"${filename}", "image":"${fileHash}","serialnumber":"${serialnum}"}}`
          // ),
          body: JSON.stringify({
            pinataMetadata: { name: `${filename}.json` },
            pinataContent: {
              name: `${filename}`,
              image: `${fileHash}`,
              serialnumber: `${serialnum}`,
            },
          }),
        };

        const response = await fetch(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          options
        );
        const data = await response.json();
        this.metadataCID = data.IpfsHash;

        $("#result").text("업로드 완료. NFT 발행을 눌러주세요.");
        $("#mintButton").show();
      } catch (err) {
        console.error("Error:", err);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  },

  clickMinting: async function (_publickey, _privatekey) {
    try {
      const transferEth = await web3.eth.accounts.signTransaction(
        {
          from: "0x5469E28950211404600ca84fFb5Ad34D1aE72BbE",
          to: _publickey,
          value: web3.utils.toWei("1", "ether"),
          gas: 30000, // 간단한 이더 전송의 기본 가스
          gasPrice: web3.utils.toWei("20", "gwei"), // 가스 가격 설정
          data: contract.methods.sendEther(_publickey).encodeABI(),
        },
        "0xb50af6bb1c07a3ce02a1557fea55828b29a032df3d8e7cb700b6e527b2b01cd4"
      );
      const transferReceipt = await web3.eth.sendSignedTransaction(
        transferEth.rawTransaction
      );
      console.log("이더 전송 완료, receipt: ", transferReceipt);
      console.log("돈 보내기 성공");
      //이더 전송 완료 후 nft 민팅
      const signedTx = await web3.eth.accounts.signTransaction(
        {
          from: _publickey,
          to: contractAddress,
          gas: 2000000,
          gasPrice: web3.utils.toWei("20", "gwei"),
          data: contract.methods
            .mintNFT(_publickey, this.metadataCID)
            .encodeABI(),
        },
        _privatekey
      );

      const mintReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log("민팅 완료, receipt: ", mintReceipt);
      alert("민팅 완료");
      location.reload();
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
  if (!App.checkLogin(privatekey, publickey)) {
    // 로그인 메시지 보여주기
    $("#userMessage").css("display", "block"); // 메시지를 표시
    return; // 이후 동작은 멈춤
  } else {
    $("#userMessage").css("display", "none"); // 로그인 성공 시 메시지 숨기기
  }
  let filename;
  let uploadFile;
  $("#mintButton").hide();

  //파일명
  $("#upload").on("change", function (e) {
    filename = e.target.files[0]["name"];
    uploadFile = e.target.files[0];
  });

  $("#uploadButton").on("click", function () {
    if (filename && uploadFile) {
      App.fileUploadToPinata(filename, uploadFile);
    } else {
      alert("파일 먼저 업로드해주세요.");
    }
  });

  $("#mintButton").on("click", function () {
    App.clickMinting(publickey, privatekey);
  });
});
