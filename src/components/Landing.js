import React, { Component } from 'react';
import VideoHeader from './VideoHeader';
import ImageInfoCard from './ImageInfoCard';
import Features from './Features';
import AboutBlurb from './AboutBlurb';
import Platforms from './Platforms';

export class Landing extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount () {

    }

    render() {
        return (
            <>
                <VideoHeader/>
                <ImageInfoCard/>
                <AboutBlurb/>
                <Platforms/>
                <Features/>
            </>
        );
    }
}

export default Landing;