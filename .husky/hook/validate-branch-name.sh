branchName=$(git rev-parse --abbrev-ref HEAD)

result=$(node -e "console.log(RegExp('(' + require('./.husky/constant.js')['TYPE_ENUM_COMMIT'].join('|') + ')\/(?!-)(?![0-9])((?!.*-{2,})([a-z0-9-]{0,40}))[a-z0-9]$').test('$branchName'))")
icon_input=$'\xE2\xA7\x97'
icon_error=$'\xF0\x9F\x9A\xA8'


if [ "$result" = true ]; then
  exit 0
else
  echo "$icon_input    branch: $branchName"
  echo "$icon_error   branch name is a incorrect"
  exit 1
fi