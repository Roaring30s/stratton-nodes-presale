const moduleExports = {
  reactStrictMode: true,
  env: {
    presaleStart: "2022-03-19T19:00:00Z", // access in a component with process.env.presaleStart
    presaleEnd: "2022-03-21T19:00:00Z",
    imageWorkerUrl: "https://images.strattonnodes-presale.workers.dev",
  },
  images: {
    loader: "imgix",
    path: "",
  },
};
