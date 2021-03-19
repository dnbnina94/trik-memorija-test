import React from 'react';
import { formatMillisecs, formatDate } from '../utils';

import Title from './Title';

class Results extends React.Component {
    render() {
        const results = Array.apply(null, {length: 10}).map((e,i) => {
            const result = this.props.results[i];
            return result ? `${result.ime} ${result.prezime} - ${formatMillisecs(result.vreme)}` : '/';
        });
        
        return (
            <div className="results">
                <Title 
                    title="rezultati za" 
                    subtitle={formatDate(this.props.date)} 
                    big={true}
                    resultsTitle={true}
                    incrementDate={this.props.incrementDate}
                    decrementDate={this.props.decrementDate}
                />

                <div className="results-wrapper">
                    {
                        results.map((r,i) => {
                            let containerClass = 'results-wrapper-container';
                            switch(i) {
                                case 0:
                                    containerClass+='-1';
                                    break;
                                case 1:
                                    containerClass+='-2';
                                    break;
                                case 2:
                                    containerClass+='-3';
                                    break;
                                default:
                                    containerClass='';
                                    break;
                            }
                            return (
                                <div 
                                    className={
                                        `results-wrapper-container 
                                        ${i!==0 ? 'results-wrapper-container-top' : ''}
                                        ${containerClass}
                                    `} key={i}
                                >
                                    {i+1}. {r}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Results;