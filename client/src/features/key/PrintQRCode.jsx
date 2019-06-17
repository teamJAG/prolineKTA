import React from "react";
import { Button, Divider } from "semantic-ui-react";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";

class GeneratedQRCode extends React.Component {
  render() {
    return (
      <div>
        <QRCode
          style={{ paddingLeft: "10px", paddingTop: "15px" }}
          value={this.props.qrCode}
          level="H"
          renderAs="svg"
          size={92}
        />
      </div>
    );
  }
}

const PrintQRCode = (props) => {
  const containerStyle = {
    display: "flex",
    alignContent: "center",
    paddingTop: "10%"
  };
  const qrCode = `${props.propertyNumber}*${
    props.keyOfficeLocation
  }*${props.keyType}*${props.keyNumber}`;
  console.log(qrCode);
  const qrRef = React.useRef();
  return (
    <div style={{ containerStyle }}>
      <ReactToPrint
        trigger={() => <Button color="purple">Print QR Code</Button>}
        content={() => qrRef.current}
      />
      <Divider />
      <GeneratedQRCode style={{ marginLeft: "10px" }} qrCode={qrCode} ref={qrRef} />
    </div>
  );
};

export default PrintQRCode;
