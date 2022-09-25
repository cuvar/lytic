interface IProps {
  message?: string;
}

export default function ErrorSite(props: IProps) {
  return (
    <div className="w-screens h-screen flex justify-center items-center">
      An error occurred. Please reload the page.
      {props.message && <div>{props.message}</div>}
    </div>
  );
}
