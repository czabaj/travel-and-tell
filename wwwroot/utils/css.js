import * as R from "/web_modules/ramda.js"
import { isNonEmptyString } from "/web_modules/ramda-adjunct.js"

/**
 * classnames like utility
 * @see https://github.com/JedWatson/classnames
 */
export const cn = R.unapply(
  R.pipe(
    R.transduce(
      R.compose(R.filter(isNonEmptyString), R.map(R.trim)),
      R.flip(R.append),
      [],
    ),
    R.join(` `),
  ),
)
