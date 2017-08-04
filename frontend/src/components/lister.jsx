import React, { Component } from 'react';

class Lister extends Component {

    /* Entry point for children classes */
    componentWillMount() {
        this.loadData();
    }

    loadData(data) {
    }

    /* items to string: abstract */
    formatItem(item) {
        return ''
    }

    /* Display item line */
    displayItem(item, i) {
        return (
            <tr key={'tr' + i}>
                <td>
                    { this.formatItem(item) }
                </td>
            </tr>
        );
    }

    /* The Renderer */
    render() {
        if (this.state.notYetLoaded) return <div className="pre-scrollable">(loading ...)</div>

        return (
            <div className="pre-scrollable">
                <table>
                    <tbody>
                        { this.state.items.map(this.displayItem.bind(this)) }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Lister;
