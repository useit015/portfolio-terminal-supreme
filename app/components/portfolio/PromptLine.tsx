type Props = {
  path: string;
  cmd: string;
  caret?: boolean;
  user?: string;
  host?: string;
};

export default function PromptLine({
  path,
  cmd,
  caret = false,
  user = "oussama",
  host = "casablanca",
}: Props) {
  return (
    <div className="prompt-line">
      <span className="p-user">{user}</span>
      <span className="p-at">@</span>
      <span className="p-host">{host}</span>
      <span className="p-colon">:</span>
      <span className="p-path">{path}</span>
      <span className="p-dollar">$</span>
      <span className="p-cmd">{cmd}</span>
      {caret ? <span className="p-caret" /> : null}
    </div>
  );
}
