import { useRouter } from 'next/router'
import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post = props => {
  return (
    <Layout>
      <Movie name={props.show.name} summary={props.show.summary} image={props.show.image && props.show.image.medium} />
    </Layout>
  );
}

const Movie = ({name, summary, image}) => {
  return (
    <>
      <h1>{name || "NOT FOUND"}</h1>
      <p>{summary && summary.replace(/<[/]?p>/g,'')}</p>
      <img src={image} />
    </>
  )
}


Post.getInitialProps = async function(context) {
  const {id} = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`fetched show : ${show.name}`);

  return { show };

};

export default Post;