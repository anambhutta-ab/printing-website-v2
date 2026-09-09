// Installed with: npm install react-helmet
import { Helmet } from "react-helmet";

const OG_IMAGE = "https://placehold.co/1200x630/png?text=Communicare+Printing+Consultants";

function SEO({ title, description, path }) {
  const url = new URL(path, window.location.origin).href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
    </Helmet>
  );
}

export default SEO;
