export default function pageUp() {
  try {
    const top = Math.max(
      document.body.scrollTop,
      document.documentElement.scrollTop
    );
    if (top > 0) {
      window.scrollBy(0, -top);
    }
  } catch (error) {
    console.log(error);
  }
}
