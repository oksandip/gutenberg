/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	BlockControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	JustifyContentControl,
} from '@wordpress/block-editor';

import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { name as buttonBlockName } from '../button';

const ALLOWED_BLOCKS = [ buttonBlockName ];
const BUTTONS_TEMPLATE = [ [ 'core/button' ] ];
const LAYOUT = {
	type: 'default',
	alignments: [],
};
const VERTICAL_JUSTIFY_CONTROLS = [ 'left', 'center', 'right' ];
const HORIZONTAL_JUSTIFY_CONTROLS = [
	'left',
	'center',
	'right',
	'space-between',
];

const POPOVER_PROPS = {
	position: 'bottom right',
	isAlternate: true,
};

function ButtonsEdit( {
	attributes: { contentJustification, orientation },
	setAttributes,
} ) {
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `is-content-justification-${ contentJustification }` ]: contentJustification,
			'is-vertical': orientation === 'vertical',
		} ),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: BUTTONS_TEMPLATE,
		orientation,
		__experimentalLayout: LAYOUT,
		templateInsertUpdatesSelection: true,
	} );

	const justifyControls =
		orientation === 'vertical'
			? VERTICAL_JUSTIFY_CONTROLS
			: HORIZONTAL_JUSTIFY_CONTROLS;

	const updateJustify = useCallback(
		( value ) => setAttributes( { contentJustification: value } ),
		[ setAttributes ]
	);

	return (
		<>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={ justifyControls }
					value={ contentJustification }
					onChange={ updateJustify }
					popoverProps={ POPOVER_PROPS }
				/>
			</BlockControls>
			<div { ...innerBlocksProps } />
		</>
	);
}

export default ButtonsEdit;
