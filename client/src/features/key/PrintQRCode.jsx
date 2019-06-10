import React from "react";
import { Button } from "semantic-ui-react";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";

class GeneratedQRCode extends React.Component {
  render() {
    return (
      <div >
        <QRCode
          style={{ paddingLeft: "10px", paddingTop: "15px" }}
          value="this is a QR code"
          level="H"
          renderAs="svg"
          size="92"
        />
      </div>
    );
  }
}

const PrintQRCode = () => {
  const qrRef = React.useRef();
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button>Print QR Code</Button>}
        content={() => qrRef.current}
      />
      <GeneratedQRCode style={{ marginLeft: "10px" }} ref={qrRef} />
    </div>
  );
};

export default PrintQRCode;
