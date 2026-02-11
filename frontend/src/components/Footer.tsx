const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content border-t border-base-300">
      <div>
        <p className="text-sm">
          © {new Date().getFullYear()} — Designed and Developed by{" "}
          <span className="font-semibold text-primary">
            Smarth Phutela
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
