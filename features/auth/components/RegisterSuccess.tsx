
const RegisterSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      {/* Success icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
        <svg
          className="h-7 w-7 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-semibold text-foreground">
        Registration successful!
      </h2>

      {/* Main message */}
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        Your account has been created successfully. We’ve sent a verification
        email to your inbox.
      </p>

      {/* Action message */}
      <p className="mt-4 text-sm text-muted-foreground">
        Please check your email and click the verification link to activate
        your account.
      </p>

      {/* Extra help */}
      <div className="mt-6 rounded-md border bg-muted/40 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Didn’t receive the email? Check your spam or junk folder.
        </p>
      </div>
    </div>
  );
};

export default RegisterSuccess