import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
// 폴더를 import하면 index.js를 자동으로 찾는다.
import ImagesZoom from './ImagesZoom';

function PostImages({ images }) {
	const [showImagesZoom, setShowImagesZoom] = useState(false);
	const onZoom = useCallback(() => {
		setShowImagesZoom(true);
	}, []);
	const onClose = useCallback(() => {
		setShowImagesZoom(false);
	}, []);

	if (images.length === 1) {
		return (
			<>
				<img src={images[0].src} alt={images[0].src} onClick={onZoom} role="presentation"/>
				{showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
			</>
		);
	}
	if (images.length === 2) {
		return (
			<>
				<img
					src={images[0].src}
					style={{ width: '50%', display: 'inline-block' }}
					alt={images[0].src}
					onClick={onZoom}
					role="presentation"
				/>
				<img
					src={images[1].src}
					style={{ width: '50%', display: 'inline-block' }}
					alt={images[1].src}
					onClick={onZoom}
					role="presentation"
				/>
				{showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
			</>
		);
	}

	return (
		<>
			<div>
				<img
					src={images[0].src}
					style={{ width: '50%' }}
					alt={images[0].src}
					onClick={onZoom}
					role="presentation"
				/>
				<div
					style={{
						display: 'inline-block',
						width: '50%',
						textAlign: 'center',
						verticalAlign: 'middle',
					}}
					onClick={onZoom}
					role="presentation"
				>
					<PlusOutlined/>
					<br/>
					{images.length - 1}개의 사진 더 보기
				</div>
			</div>
			{showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
		</>
	);
}

PostImages.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string,
		}),
	).isRequired,
};

export default PostImages;
