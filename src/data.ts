import { GalleryItem, ProductType, KeyProduct } from './types';

export const GOLF_BUNKER_IMAGE = 'https://file.yeogie.com/img.secondhand/202103/p13VH8vbDJ.jpg';
export const EXCAVATOR_BRUSH_IMAGE = 'https://file.yeogie.com/img.secondhand/202301/nqX0lqAp4j.jpg';
export const BRASS_RING_IMAGE = '/images/brass_ring_brush.png';

export const BRUSH_IMAGE_PRIMARY = GOLF_BUNKER_IMAGE;

// Unsplash industrial images for aesthetic quality
export const INDUSTRIAL_STYLING = {
  carousel1: EXCAVATOR_BRUSH_IMAGE,
  carousel2: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200', // Modern factory / tech
  factory: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',  // Industrial feel
};

export const INITIAL_PRODUCTS: ProductType[] = [
  {
    name: '원형 브러쉬',
    description: '세척, 연마, 먼지 제거용으로 사용되는 원형 형태의 정밀 가공 솔',
    iconName: 'RotateCw'
  },
  {
    name: '롤 브러쉬',
    description: '컨베이어 벨트나 평면 세척 라인에 장착하는 회전식 롤 브러쉬',
    iconName: 'Sparkles'
  },
  {
    name: '산업용 청소 브러쉬',
    description: '공장 바닥 및 대형 구조물 정화용 초강력 내구성 청소용 브러쉬',
    iconName: 'Trash2'
  },
  {
    name: '컨베이어 브러쉬',
    description: '이송 벨트 위의 오염 물질을 실시간으로 박리 회수하는 고능률 브러쉬',
    iconName: 'Shuffle'
  },
  {
    name: '특수 제작 브러쉬',
    description: '기성품으로 해결되지 않는 복잡한 각도나 틈새용 1:1 커스텀 브러쉬',
    iconName: 'Wrench'
  },
  {
    name: '기계 장착용 브러쉬',
    description: 'CNC, 선반 등 가공 설비 내부의 이물질 확산 방지 및 유도 세척용 브러쉬',
    iconName: 'Cpu'
  },
  {
    name: '바닥 청소 브러쉬',
    description: '대형 쇼핑몰, 물류창고 탑승식 청소 장비 부착용 다목적 브러쉬',
    iconName: 'Layers'
  },
  {
    name: '골프장/스크린골프용 브러쉬',
    description: '티오프 구간, 잔디 정리 및 벙커 타격 매트를 위한 기능성 브러쉬',
    iconName: 'Smile'
  }
];

export const KEY_PRODUCTS: KeyProduct[] = [
  {
    id: 'golf-bunker',
    name: '골프존 벙커매트',
    tagline: '실제 필드의 부드러운 타격감을 그대로 구현했습니다.',
    description: '한솔종합부러쉬만의 제작 기술로 설계되어, 스윙 시 실제 모래 벙커에서 클럽이 빠져나가는 저항감을 정밀하게 재생합니다. 마찰열과 수분에 극히 강하여 실내외 어디서든 반영구적인 수명을 보장합니다.',
    imageUrl: GOLF_BUNKER_IMAGE,
    features: [
      '실제 벙커 타격감 구현 기술 적용',
      '고인장력 특수 모 채택으로 극강의 내구성',
      '스크린 골프장 환경 맞춤형 사이즈 제작 가능'
    ]
  },
  {
    id: 'excavator-brush',
    name: '굴삭기 청소솔 – 쎈솔',
    brand: '쎈솔',
    tagline: '산업 현장 대형 청소를 굴삭기로 신속하게 해결하세요.',
    description: '중장비인 굴삭기 버킷 하부에 견고하게 고정하여 도로 모래, 토사, 건설 폐기물을 고소 세척 및 소거하는 대형 강력 솔입니다. 제작 기술로 기둥이나 벽면 모서리 세척 시 손상이 적습니다.',
    imageUrl: EXCAVATOR_BRUSH_IMAGE,
    features: [
      '소형부터 중대형 굴삭기 완벽 브래킷 호환',
      '공사현장 및 도로 보수 구간 초강력 소거',
      '마모가 가속되는 수동 청소 대비 20배 속도 향상'
    ]
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: '골프존 인조잔디 벙커 전용 매트 납품',
    description: '',
    category: 'production',
    imageUrl: GOLF_BUNKER_IMAGE,
    createdAt: '2026-05-10'
  },
  {
    id: 'gal-2',
    title: '도로 세척용 쎈솔(굴삭기 솔) 맞춤형 출고',
    description: '',
    category: 'production',
    imageUrl: EXCAVATOR_BRUSH_IMAGE,
    createdAt: '2026-05-18'
  }
];
