import {
  useState,
  useEffect,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { useLocation } from "react-router-dom";

export const useDelayUnmount = (isMounted, delayTime) => {
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showDiv]);
  return showDiv;
};

export const addPropsToChildren = (children, props) => {
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });
  return childrenWithProps;
};

export const minutesToHoursAndMinutes = (n) => {
  if (n === null) {
    return 0;
  }
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}min`;
};

export const useQuery = () => {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location]);
};
