interface HtmlRerenderProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlString: string;
  className?: string;
}

export default function HtmlRerender({
  htmlString,
  className = "",
  ...rest
}: HtmlRerenderProps) {
  const cleanHtml = (html: string) => {
    return html
      .replace(/<font color="([^"]*)">/g, '<span style="color: $1">')
      .replace(/<\/font>/g, "</span>");
  };
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: cleanHtml(htmlString || ""),
      }}
      className={`${className} [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1`}
      {...rest}
    />
  );
}
