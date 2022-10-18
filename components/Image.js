import Image from "next/image";

const cloudflareImageLoader = ({ src, width, quality }) => {
  const sanitizedBranchName = process.env.NEXT_PUBLIC_CF_PAGES_BRANCH.replace(
    /[^a-zA-Z\d\s:]/,
    "-"
  );
  const urlBranchPart =
    sanitizedBranchName === "main" ? "" : `${sanitizedBranchName}.`;

  const url = `https://${urlBranchPart}stratton-nodes-presale.pages.dev`;

  if (!quality) {
    quality = 75;
  }
  return `${process.env.imageWorkerUrl}?width=${width}&quality=${quality}&image=${url}${src}`;
};

export default function Img(props) {
  if (process.env.NODE_ENV === "development") {
    return <Image unoptimized={true} {...props} alt={props.alt} />;
  } else {
    return <Image {...props} loader={cloudflareImageLoader} alt={props.alt} />;
  }
}
