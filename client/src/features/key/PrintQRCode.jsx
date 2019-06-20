import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import { Button, Divider } from "semantic-ui-react";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";

class GeneratedQRCode extends React.Component {
  render() {
    return (
      <div>
        <QRCode
          style={{ paddingLeft: "10px", paddingTop: "15px"}}
          value={this.props.qrCode}
          level="L"
          renderAs="svg"
          size={92}
        />
          <p
          style={{
          fontSize: '25px',
          fontWeight: 'bold',
          transform: "rotate(90deg)",
          transformOrigin: 'left top 0',
          marginLeft: '70px',
          marginTop: '15px'
          }}>
          {this.props.propNumber}-{this.props.keyType.charAt(0)}{this.props.keyNumber}-{this.props.keyQuantity}
          </p>
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
  const [redirect, setRedirect] = useState(null)

  return (
    <div style={{width: '70%'}}>
      {redirect}
      <div style={{display: 'flex', justifyContent:'center'}}>
      <GeneratedQRCode
        propNumber={props.propertyNumber}
        keyType={props.keyType}
        keyQuantity={props.keyQuantity}
        keyNumber={props.keyNumber}
        qrCode={qrCode}
        ref={qrRef}
      />
      </div>
      <ReactToPrint
        trigger={() => <Button floated='right' color='purple'>Print QR Code</Button>}
        content={() => qrRef.current}
        pageStyle={{display: 'absolute', left: '200px'}}
        onAfterPrint={() => {setRedirect(<Redirect to="/keys" />)}}
      />
    </div>
  );
};

export default PrintQRCode;
