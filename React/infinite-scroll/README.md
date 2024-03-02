We can also directly implement using window.scroll as done below.https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
window.innerheight : e interior height of the window in pixels, including the height of the horizontal scroll bar, if present.

The Element.scrollTop property gets or sets the number of pixels that an element's content is scrolled vertically.

The HTMLElement.offsetHeight read-only property returns the height of an element, including vertical padding and borders, as an integer.

const handleScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
    return;
  }
  fetchData();
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [isLoading]);