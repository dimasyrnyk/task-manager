import React from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const AppLoader = () => {
    return (
        <Loader
            type="TailSpin"
            color="#61dafb"
            height={70}
            width={70} //3 secs
            style={{width: "80px", margin: "0 auto"}} />
    );
}