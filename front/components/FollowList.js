import React from 'react';
import { PropTypes } from 'prop-types';
import { List, Button, Card } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

function FollowList({ header, data }) {
	return (
		<List
			style={{ marginButton: 20 }}
			// gutter(간격)
			grid={{ gutter: 4, xs: 2, md: 3 }}
			size="small"
			header={<div>{header}</div>}
			loadMore={
				<div style={{ textAlign: 'center', margin: '10px 0' }}>
					<Button>Load more</Button>
				</div>
			}
			bordered={false}
			// data 배열의 각 item을 리스트의 아이템으로 그린다.
			dataSource={data}
			renderItem={(item) => (
				<List.Item style={{ marginTop: 20 }}>
					<Card actions={[<CloseCircleOutlined key="stop"/>]}>
						<Card.Meta description={item.nickname}/>
					</Card>
				</List.Item>
			)}
		/>
	);
}

FollowList.propTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
};

export default FollowList;
