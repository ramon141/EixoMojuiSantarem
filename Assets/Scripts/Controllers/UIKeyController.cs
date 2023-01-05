using System;
using System.Threading;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using TMPro;

public class UIKeyController : MonoBehaviour
{
    //Singleton
    public static UIKeyController uikc;

    public TextMeshProUGUI txtQuantKeys;

    Dictionary<string, int> keys = new Dictionary<string, int>();

    private int counterKeys = 0;

    private void Awake()
    {
        if (uikc == null)
            uikc = this;
        else if (uikc != this)
            Destroy(gameObject);
    }

    public void addKey(String type)
    {
        counterKeys++;
        if (keys.ContainsKey(type))
        {
            int quant = keys[type];
            keys.Remove(type);
            keys.Add(type, quant + 1);
        }
        else
        {
            keys.Add(type, 1);
        }

        updateQuantKeys();
    }

    public bool removeKey(String type)
    {
        if (keys.ContainsKey(type))
        {
            int quant = keys[type];
            keys.Remove(type);
            if (quant > 1)
            {
                keys.Add(type, quant - 1);
            }
            counterKeys--;
            updateQuantKeys();
            return true;
        }

        return false;
    }

    private void updateQuantKeys()
    {
        txtQuantKeys.text = "x" + counterKeys.ToString();
    }

}
