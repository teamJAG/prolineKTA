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
          level="L"
          renderAs="svg"
          size={92}
        />
        <div
          style={{
            position: 'absolute',
            top: '32%',
            left: '12%',
            fontSize: '25px',
            fontWeight: 'bold',
            transform: "rotate(90deg)"
          }}
        >
          <p>
            {this.props.propNumber}-{this.props.keyType.charAt(0)}{this.props.keyNumber}-{this.props.keyQuantity}
          </p>
        </div>
      </div>
    );
  }
}

const PrintQRCode = props => {
  const qrCode = `${props.propertyNumber}*${props.keyOfficeLocation}*${
    props.keyType
  }*${props.keyNumber}`;
  console.log(qrCode);
  const qrRef = React.useRef();
  return (
    <div>
      <GeneratedQRCode
        style={{ marginLeft: "10px" }}
        propNumber={props.propertyNumber}
        keyType={props.keyType}
        keyQuantity={props.keyQuantity}
        keyNumber={props.keyNumber}
        qrCode={qrCode}
        ref={qrRef}
      />

      <Divider style={{marginTop: '30%'}} />
      <ReactToPrint
        trigger={() => <Button>Print QR Code</Button>}
        content={() => qrRef.current}
      />
    </div>
  );
};

export default PrintQRCode;
