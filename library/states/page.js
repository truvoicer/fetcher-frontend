export const pageInitialState = (self) => {
    self.state.page = {
        pageData: {},
        setPageData: setPageData,
    }

}

export const setPageData = (data, self) => {
    console.log(data)
    self.setState({
        page: {
            pageData: data,
            setPageData: setPageData
        }
    });
}