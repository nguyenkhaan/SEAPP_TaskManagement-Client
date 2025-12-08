import * as React from "react";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import "../../styles/multiemail.css";
function MultiEmail({ emails, setEmails, focused, setFocused }) {
  return (
    <div className="w-full bg-[#f5f8ff]">
      <ReactMultiEmail
        placeholder="Input your email"
        emails={emails}
        onChange={(_emails) => {
          setEmails(_emails);
        }}
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="md:text-[18px] text-base h-10 md:h-12 w-full border border-(--color-border) overflow-hidden font-md rounded-[10px] py-3 px-5"
        style={{
          backgroundColor: "var(--color-block-item-2)",
          borderWidth: 1,
          borderColor: "#757070",
          color: 'var(--color-text)'
        }}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}

export default MultiEmail;
