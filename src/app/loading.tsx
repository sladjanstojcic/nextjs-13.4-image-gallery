import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading: React.FC = () => {
    return (
        <div>
            <Spinner animation="border" className="d-block m-auto"/>
        </div>
    );
};

export default Loading;
