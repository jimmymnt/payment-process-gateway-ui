import React, {useEffect} from 'react';

const Success = () => {
  useEffect(() => {
    Object.keys(localStorage)
      .filter(x =>
        x.startsWith('pi_'))
      .forEach(x =>
        localStorage.removeItem(x))
  }, []);

  return (
    <div>
      SUCCESS
    </div>
  );
};

export default Success;