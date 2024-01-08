import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <footer className="footer" style={{ position: 'fixed', bottom: '0', width: '100%', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
                    <span className="text-muted">
                       Pemrograman Internet - Nadila Az-Zahra
                    </span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;
