'use client';
import EditorModel from '@/components/editor-model/editorModel';
import SwitchNetworkSelect from '@/components/selects/switchNetwork';

export default function Home() {
  return (
    <div className="flex flex-col gap-3">
      <SwitchNetworkSelect />
      <EditorModel />
    </div>
  );
}
