export class Site {
    constructor(state) {
        this.state = state;
        this.siteData = "";
    }

    init() {
        this.state.setState({
            siteData: this.siteData
        })
    }

    getData() {
        return this.state.siteData;
    }
    setData(siteData) {
        this.state.siteData = siteData;
    }
}