set aglwjs_docs_path=%cd%\docs
@echo %aglwjs_docs_path%
@RD /S /Q "%aglwjs_docs_path%"
jsdoc aglw.js --destination ./docs/
