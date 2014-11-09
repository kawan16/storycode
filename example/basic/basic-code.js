
// UC1 @T Testing Inline Use Case Comment.
// UC1 @A Some testing situations for the inline use case comment.

// UC2 @T Testing Block Use Case Comment.
// UC2 @A Some testing situations for the block use case comment.

// UC1 @S1 I extract a simple inline use case
function inlineUseCase() { console.log('Inline Use Case'); }

// UC1 @S2 I extract a simple inline use case with a start block comment symbol /*
function inlineUseCaseWithStartBlock() { console.log('Inline Use Case - Start Block comment'); }

// UC1 @S3 I extract a simple inline use case with a end block comment symbol */
function inlineUseCaseWithEndBlock() { console.log('Inline Use Case - End Block comment'); }

/* UC2 @S1 I extract a block comment use case */
function blockUseCase() { console.log('Block Use Case'); }

/* UC2 @S2 I extract a block comment use case // with an inline comment */
function blockUseCaseWithInline() { console.log('Block Use Case - Inline comment'); }

/*
 UC2 @S3 I extract a block comment use case on multiline
 */
function blockUseCaseMultiLine() { console.log('Block Use Case - Multiline'); }

/*
 UC2 @S4 I extract a block comment use case on multiline with some inline
 // stupid inline
 */
function blockUseCaseMultiLineInline() { console.log('Block Use Case - Multiline - Inline'); }

/*
 UC2 @S5 I extract a block comment use case on multiline with some start block
 /* stupid inline
 */
function blockUseCaseMultiLineStartBlock() { console.log('Block Use Case - Multiline -  Start Block'); }

// Not an inline comment ( just avoid it)
function notInlineUseCase() { console.log('Not an inline use case');}

// Not an inline comment with UC6 @S2 Not an inline comment
function notInlineUseCaseInline() { console.log('Not an inline use case - Inline');}

/* Not a block comment use case ( just avoid it ) */
function notBlockUseCase() { console.log('Not an block use case');}

/* Not a block comment use case UC7 @S3 Not a block comment */
function notBlockUseCaseBlock() { console.log('Not an block use case - Block');}

/* Not a block comment use case
 UC7 @S3 Not a block comment */
function notBlockUseCaseMultilineBlock() { console.log('Not an block use case - Block - Multine');}
