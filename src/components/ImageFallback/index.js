import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ImageFallback = ({ className, src, fallback, alt }) => {
  const [imageUrl, setImageUrl] = useState(src);

  useEffect(() => {
    setImageUrl(src);
  }, [src]);

  const errorImageLoad = () => {
    setImageUrl(fallback);
  };
  return (
    <img
      className={className}
      src={imageUrl}
      alt={alt}
      onError={errorImageLoad}
    />
  );
};

ImageFallback.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  alt: PropTypes.string.isRequired,
};
