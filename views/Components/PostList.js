class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <header className="major">
                    <h2>Ante interdum</h2>
                </header>
                <div className="mini-posts">
                    <article>
                        <a href="#" className="image"><img src="images/pic07.jpg" alt=""/></a>
                        <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.</p>
                    </article>
                    <article>
                        <a href="#" className="image"><img src="images/pic08.jpg" alt=""/></a>
                        <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.</p>
                    </article>
                    <article>
                        <a href="#" className="image"><img src="images/pic09.jpg" alt=""/></a>
                        <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.</p>
                    </article>
                </div>
                <ul className="actions">
                    <li><a href="#" className="button">More</a></li>
                </ul>
            </section>
        )
    }
}
export default PostList;