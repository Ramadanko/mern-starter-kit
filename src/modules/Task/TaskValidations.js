import { body, param, check } from 'express-validator'
import sanitizeHtml from 'sanitize-html'

export const taskUpdateValidations = [
  param('id').trim().not().isEmpty().escape(),
  check('title').optional().trim().not().isEmpty().escape().isLength({ min: 3 }),
  check('description').optional().trim().isLength({ min: 3 }).customSanitizer(value => {
    return sanitizeHtml(value, {
      exclusiveFilter: (frame) => {
        return frame.tag === 'script'
      },
      textFilter: (value) => {
        return value.replace(/\\n|\s\s/g, '').trim()
      },
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h2']),
      allowedAttributes: false
    })
  }),
  check('status').optional().matches(/open|in-progress|done/)
    .withMessage('Invalid status value. Status could be open, in-progress or done')
]

export const taskCreateValidations = [
  body('title').trim().not().isEmpty().escape().isLength({ min: 3 }),
  // customSanitizer must be synchronous
  body('description').not().isEmpty().trim().isLength({ min: 3 }).customSanitizer(value => {
    return sanitizeHtml(value, {
      exclusiveFilter: (frame) => {
        return frame.tag === 'script'
      },
      textFilter: (value) => {
        return value.replace(/\\n|\s\s/g, '').trim()
      },
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h2'])
    })
  }),
  body('status').optional().not().isEmpty().withMessage('Invalid status type')
]
