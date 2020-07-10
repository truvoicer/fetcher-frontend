export class PageState {
    constructor(reactComponent) {
        this.component = reactComponent;
        this.state = reactComponent.state;
        this.state = {
            pageData: {},
            updatePageData: this.updateData.bind(this),
        }
    }

    setCallbacks() {
        // this.state.setState({
        //             pageData: data
        // })
    }

    updateData(data) {
        console.log(data)
        this.setData(data);
    }

    setData(data) {
        console.log(this.component)
        this.component.state.setState({
            pageData: data
        });
    }

    getData() {
        return this.state.pageData;
    }
}