import React from 'react';
import WeightGet from './WeightGet';
import WeightPost from './WeightPost';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Svoris</h1>
                <br />
                <WeightGet />
                <br />
                <WeightPost />
            </div>
        );
    }
}

export default App;
