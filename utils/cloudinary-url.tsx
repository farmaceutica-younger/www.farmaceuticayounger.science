export const cloudinaryUrl = (link: string) => {
  const res = link.replace(
    /https?:\/\/res.cloudinary.com\/.*\/image\/upload\/v[^\/]*/,
    ""
  );
  return res;
};

const rg = /https?:\/\/res.cloudinary.com\/(.*)\/image\/upload\/v[^\/]*(.*)/;
export const resizeCloudinaryImage = (link: string, w = 300) => {
  return link.replace(rg, (_, name, id) => {
    return `https://res.cloudinary.com/${name}/image/upload/c_scale,w_${w},f_auto${id}`;
  });
};
