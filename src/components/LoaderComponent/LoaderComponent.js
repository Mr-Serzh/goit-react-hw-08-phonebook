import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function LoaderComponent() {
  return (
    <div>
      <Loader type="BallTriangle" color="#FF1493" height={70} width={70} />
    </div>
  );
}
