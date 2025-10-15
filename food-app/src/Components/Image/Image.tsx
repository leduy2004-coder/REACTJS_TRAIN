import React, { useState, forwardRef } from "react";
import classNames from "classnames";
import images from "@/assets/images";
import styles from "./Image.module.scss";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  alt?: string;
  className?: string;
  fallback?: string;
};

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = images.noImage,
      ...props
    },
    ref,
  ) => {
    const [fallback, setFallback] = useState<string>(customFallback);

    const handleError = () => {
      if (src !== fallback) {
        setFallback(customFallback);
      }
    };

    const imageSrc = src || fallback;

    return (
      <img
        ref={ref}
        src={imageSrc}
        alt={alt}
        className={classNames(styles.wrapper, className)}
        onError={handleError}
        {...props}
      />
    );
  },
);

Image.displayName = "Image"; // cần khi dùng forwardRef trong TS

export default Image;
