import React, { FC, useEffect, useState } from 'react';
import { CustomSelect } from '@components/select/CustomSelect.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import CustomButton from '@components/button/CustomButton.tsx';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { ProductCategories } from '@/constants/interfaces/productCategories.ts';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { getCategories } from '@/api/products.ts';
import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import { SelectChangeEvent } from '@mui/material/Select';
import { Editor } from 'react-draft-wysiwyg';
import rawEditorTextToHTML from '@/helpers/functions/rawEditorTextToHTML.ts';
import { ProductsDto } from '@/api/dto/products.dto.ts';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.scss';
import { Trash } from '@phosphor-icons/react';

const border = '1px #CBD2E0 solid';
export type productForm = Omit<ProductsDto, 'photos' | '_id'>;

interface IInputs {
  category: boolean;
  subcategory: boolean;
  productName: boolean;
  description: boolean;
  productDetails: boolean;
  price: boolean;
  amount: boolean;
  size: boolean;
}
const defaultInputAvailability: IInputs = {
  price: true,
  size: true,
  amount: true,
  productDetails: true,
  description: true,
  subcategory: true,
  category: true,
  productName: true,
};
interface IProps {
  onSubmitHandler: (values: productForm) => void;
  initialValues?: productForm;
  buttonTitle: string;
  unavailableInputs?: IInputs;
  isShoes: boolean;
}

const ItemForm: FC<IProps> = ({
  onSubmitHandler,
  initialValues,
  buttonTitle,
  unavailableInputs = defaultInputAvailability,
  isShoes,
}) => {
  if (isShoes) {
    initialValues = {
      productDetails: initialValues?.productDetails || '',
      description: initialValues?.description || '',
      name: '',
      size: [],
      category: '',
      subcategory: '',
      price: 0,
      rating: 0,
      title: '',
    };
  }
  const initialsSizes = initialValues?.size.map((size, index) => {
    return { index, size };
  });
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<ProductCategories[]>();

  const [sizes, setSizes] = useState<{ index: number; size: string }[]>(initialsSizes || []);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialValues?.subcategory || '');
  const [price, setPrice] = useState<string>(initialValues?.price.toString() || '');
  const [amount, setAmount] = useState<string>('');
  const [productName, setProductName] = useState<string>(initialValues?.name || '');

  const [editorStateDescription, setEditorStateDescription] = useState(EditorState.createEmpty());
  const [editorStateProductDetails, setEditorStateProductDetails] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (initialValues) {
      const descriptionAsHTML = initialValues.description;
      const productDetailsAsHTML = initialValues.productDetails;
      const descriptionFromHTML = convertFromHTML(descriptionAsHTML);
      const productDetailsFromHTML = convertFromHTML(productDetailsAsHTML);
      setEditorStateDescription(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(descriptionFromHTML.contentBlocks, descriptionFromHTML.entityMap)
        )
      );
      onEditorStateProductDetailsChange(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(productDetailsFromHTML.contentBlocks, productDetailsFromHTML.entityMap)
        )
      );
    }
  }, []);
  const onEditorStateDescriptionChange = (newEditorState) => {
    setEditorStateDescription(newEditorState);
  };
  const onEditorStateProductDetailsChange = (newEditorState) => {
    setEditorStateProductDetails(newEditorState);
  };

  useEffect(() => {
    dispatch(loading());
    getCategories().then((res) => {
      setCategories(res.data);
    });

    dispatch(loadingFinished());
  }, []);
  const clickHandler = () => {
    const descriptionState = editorStateDescription.getCurrentContent();
    const descriptionHtmlContent = rawEditorTextToHTML(descriptionState);

    const productDetailsState = editorStateProductDetails.getCurrentContent();
    const productDetailsHtmlContent = rawEditorTextToHTML(productDetailsState);

    const category = categories?.find((el) => el.categoryTitle === selectedCategory)?._id || '';

    onSubmitHandler({
      price: Number(price),
      category: category,
      subcategory: selectedSubCategory,
      size: sizes.map((size) => size.size.toUpperCase()),
      name: productName,
      description: descriptionHtmlContent,
      productDetails: productDetailsHtmlContent,
    });
  };
  const changeHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: SelectChangeEvent) => {
      setState(e.target.value);
    };
  };
  const sizeHandler = (
    setState: React.Dispatch<
      React.SetStateAction<
        {
          index: number;
          size: string;
        }[]
      >
    >,
    index: number
  ) => {
    return (e: SelectChangeEvent) => {
      setState((prevState) => {
        const record = prevState.find((el) => el.index === index);

        if (!record) return prevState;

        return prevState.map((el) => {
          if (el.index === record.index) return { index: record.index, size: e.target.value };

          return el;
        });
      });
    };
  };
  const addNewSize = () => {
    const uniqueIndex = [...new Set(sizes.map((el) => el.index))].pop();
    setSizes((prevState) => [...prevState, { index: (uniqueIndex || 0) + 1, size: '' }]);
  };
  const removeSize = (index: number) => {
    setSizes((prevState) => prevState.filter((el) => el.index !== index));
  };

  if (!categories) return;

  const subcategories = categories.find((el) => el.categoryTitle === selectedCategory)?.subCategory || [''];
  const valueOfSubCategory = subcategories.includes(selectedSubCategory) ? selectedSubCategory : '';
  return (
    <div className={'flex flex-col gap-5 w-full'}>
      <p className={'font-bold'}>2. Item Detail</p>

      {unavailableInputs.category && (
        <>
          <p>Category</p>
          <CustomSelect
            value={selectedCategory}
            array={categories.map((el) => el.categoryTitle)}
            defaultValue={initialValues?.category.toString() || ''}
            handleFunc={changeHandler(setSelectedCategory)}
          />
        </>
      )}
      {unavailableInputs.subcategory && (
        <>
          <p>Subcategory</p>
          <CustomSelect
            value={valueOfSubCategory}
            array={subcategories}
            defaultValue={initialValues?.subcategory.toString() || ''}
            handleFunc={changeHandler(setSelectedSubCategory)}
          />
        </>
      )}

      {unavailableInputs.productName && (
        <CustomInput
          description={'Product name'}
          value={productName}
          onChange={changeHandler(setProductName)}
          border={border}
        />
      )}

      {unavailableInputs.description && (
        <>
          <p>Description</p>
          <div>
            <Editor
              editorState={editorStateDescription}
              onEditorStateChange={onEditorStateDescriptionChange}
              wrapperStyle={{ border: '2px solid #CBD2E0' }}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
              }}
              handlePastedText={() => false}
            />
          </div>
        </>
      )}

      {unavailableInputs.productDetails && (
        <>
          <p>Product Details</p>
          <div>
            <Editor
              editorState={editorStateProductDetails}
              onEditorStateChange={onEditorStateProductDetailsChange}
              wrapperStyle={{ border: '2px solid #CBD2E0' }}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
              }}
              handlePastedText={() => false}
            />
          </div>
        </>
      )}

      {unavailableInputs.price && (
        <CustomInput
          type={InputType.number}
          description={'Price'}
          value={price}
          onChange={changeHandler(setPrice)}
          border={border}
        />
      )}

      {unavailableInputs.amount && (
        <CustomInput
          type={InputType.number}
          description={'Amount'}
          value={amount}
          onChange={changeHandler(setAmount)}
          border={border}
        />
      )}

      {unavailableInputs.size && (
        <div className={'flex flex-row items-center flex-wrap gap-6 content-end'}>
          {sizes.map((el) => {
            return (
              <div key={el.index} className={'flex flex-col w-1/5 items-center'}>
                <Trash size={26} color={'red'} className={'cursor-pointer'} onClick={() => removeSize(el.index)} />
                <CustomInput
                  type={InputType.text}
                  value={typeof el?.size === 'string' ? el?.size?.toUpperCase() : el?.size}
                  onChange={sizeHandler(setSizes, el.index)}
                  border={border}
                />
              </div>
            );
          })}

          <CustomButton title={'Add size'} handler={addNewSize} styles={'w-1/6 !mx-[18px] !py-5 !my-0'} />
        </div>
      )}
      <CustomButton title={buttonTitle} handler={clickHandler} />
    </div>
  );
};

export default ItemForm;
