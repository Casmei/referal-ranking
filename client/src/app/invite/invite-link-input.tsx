"use client";

import { InputField, InputIcon, InputRoot } from "@/components/input";
import { IconButton } from "@/components/icon-button";
import { Copy, Link } from "lucide-react";

interface InviteLinkInputParams {
  inviteLink: string;
}

export default function InviteLinkInput({ inviteLink }: InviteLinkInputParams) {
  function copyInviteLink() {
    navigator.clipboard.writeText(inviteLink);
  }
  return (
    <InputRoot>
      <InputIcon>
        <Link />
      </InputIcon>

      <InputField readOnly defaultValue={inviteLink} />

      <IconButton className="-mr-2" onClick={copyInviteLink}>
        <Copy className="size-5" />
      </IconButton>
    </InputRoot>
  );
}
