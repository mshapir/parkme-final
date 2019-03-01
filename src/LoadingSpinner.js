import React from 'react';
import './loading.css'
import ReactLoading from 'react-loading';

const LoadingSpinner = () => (
    <ReactLoading id='load' type='spin' color='blue' height={'20%'} width={'20%'} />
);

export default LoadingSpinner;
