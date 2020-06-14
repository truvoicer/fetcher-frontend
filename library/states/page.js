export class PageState {
    constructor(state) {
        this.state = state;
    }

    init() {
        // const updateData = (data) => {
        //     this.state.setState({
        //     });
        // };
        this.state = {
            pageData: {},
            updatePageData: this.updateData,
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
        this.state.setState({
            pageData: data
        });
    }

    getData() {
        return this.state.pageData;
    }
}