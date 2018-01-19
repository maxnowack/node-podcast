const warnedPositions = {};

function deprecate({
  type,
  name,
  version,
  alternative,
}) {
  const stack = new Error().stack || '';
  let at = (stack.match(/(?:\s+at\s.+){2}\s+at\s(.+)/) || [undefined, ''])[1];

  if (/\)$/.test(at)) {
    [at] = at.match(/[^(]+(?=\)$)/);
  } else {
    at = at.trim();
  }
  if (at in warnedPositions) {
    return;
  }
  warnedPositions[at] = true;
  let message;
  switch (type) {
    case 'class':
      message = 'Class';
      break;
    case 'property':
      message = 'Property';
      break;
    case 'method':
      message = 'Method';
      break;
    case 'function':
      message = 'Function';
      break;
    default: message = '';
  }
  message += ` \`${name}\` has been deprecated`;
  if (version) {
    message += ` since version ${version}`;
  }
  if (alternative) {
    message += `, use \`${alternative}\` instead`;
  }
  message += '.';
  if (at) {
    message += `\n    at ${at}`;
  }

  console.warn(message); // eslint-disable-line no-console
}

export default deprecate;
