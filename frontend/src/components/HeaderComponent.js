import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav 
                    className="navbar navbar-dark" style={{ backgroundColor: '#808080' }}>
                    <div>
                      <a href="/users" className="navbar-brand" style={{ color: '#FFFFFF' }}>
                        PEMINJAMAN BUKU
                            </a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
